import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(null)
    const [loading, setLoading] = useState(null)

    const onSubmit = async () => {
        if (!validateForm) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta!")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("Huno un problema cambiando la contraseña")
            return
        }

        toastRef.current.show("Se ha cambiado la contraseña", 2000)
        setShowModal(false)

    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Este campo no puede estar vacío")
            isValid = false
        }
        if (size(newPassword) < 6) {
            setErrorNewPassword("La contraseña debe tener una longitud mayor a 6 caracteres")
            isValid = false
        }
        if (size(confirmPassword) < 6) {
            setErrorConfirmPassword("La confirmación de la nueva contraseña debe tener min 6 caracteres")
            isValid = false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña no es igual a su confirmación")
            setErrorNewPassword("La confirmación no es igual a la nueva contraseña")
            isValid = false
        }
        if (newPassword === currentPassword) {
            setErrorCurrentPassword("Debes ingresar una contraseña diferente")
            setErrorNewPassword("Debes ingresar una contraseña diferente")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Input
                placeholder="Ingresa tu nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Input
                placeholder="Ingresa la confirmación de la contraseña"
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%",
    },
    btn: {
        backgroundColor: "#60585e"
    }
})

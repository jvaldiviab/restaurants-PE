import firebase from 'firebase/app'
import React, {useState, useCallback} from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Rating } from 'react-native-elements'
import moment from 'moment/min/moment-with-locales'
import { getRestaurantReviews } from '../../utils/actions'
import {map, size} from 'lodash'
import { useFocusEffect} from '@react-navigation/native'

moment.locale("es")

export default function ListReview({ navigation, idRestaurant}) {
    const [userLogged, setUserLogged]=useState(false)
    const [reviews,setReviews] = useState([])
    
    firebase.auth().onAuthStateChanged((user)=>{
        user ? setUserLogged(true):setUserLogged(false)
    })
    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getRestaurantReviews(idRestaurant)
                if(response.statusResponse){
                    setReviews(response.reviews)
                }
            })()
        }, [])
    )

    return (
        <View>
            {
                userLogged?(
                    <Button
                        buttonStyle={styles.btnAddReview}
                        title="Escribe una opinión"
                        titleStyle={styles.btnTitleAddReview}
                        onPress={()=>navigation.navigate("add-review-restaurant",{idRestaurant})}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#A376C7"
                        }}
                    />
                ):(
                    <Text
                        onPress={() => navigation.navigate("login")}
                        style={styles.mustLoginText}
                    >
                        Para escribir una opinión, debes iniciar sesión.{" "}
                        <Text style={styles.loginText}>
                            Iniciar Sesión
                        </Text>
                    </Text>
                )
            }
            {
                size(reviews) > 0 && (
                    map(reviews,(reviewDocument, index)=>(
                        <Review  reviewDocument={reviewDocument}/>
                    ))
                )
            }
        </View>
    )
}

function Review ({ reviewDocument}){
    const {title,review,createAt,avatarUser,rating} = reviewDocument
    const createReview= new Date(createAt.seconds * 1000)

    return (
            <View style={styles.viewReview}>
                <View style={styles.imageAvatar}>
                    <Avatar
                        renderPlaceholderContent={<ActivityIndicator color="#FFF"/>}
                        size="large"
                        rounded
                        containerStyle={styles.imageAvatarUser}
                        source={
                            avatarUser
                                ?{uri: avatarUser}
                                : require("../../assets/avatar-default.jpg")
                        }
                    />
                </View>
                <View style={styles.viewInfo}>
                    <Text style={styles.reviewTitle}>{title}</Text>
                    <Text style={styles.reviewText}>{review}</Text>
                    <Rating
                        imageSize={15}
                        startingValue={rating}
                        readonly
                    />
                    <Text style={styles.reviewDate}>{moment(createReview).format("LLL")}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color:"#A376C7"
    },
    mustLoginText:{
        textAlign:"center",
        color:"#A376C7",
        padding:20
    },
    loginText: {
        fontWeight:"bold"
    },
    viewReview:{
        flexDirection:"row",
        padding:10,
        paddingBottom: 20,
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    imageAvatar: {
        marginRight: 15
    },
    imageAvatarUser:{
        width:50,
        height:50
    },
    viewInfo: {
        flex:1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate: {
        marginTop:5,
        color:"gray",
        fontSize:12,
        position:"absolute",
        right:0,
        bottom:0
    }
})

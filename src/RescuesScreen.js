import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontVariants, colors } from '../theme';
import { Feather, Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import RescueCard from '../components/RescueCard';
import { FirebaseContext } from '../FirebaseData';
import { screenHeight } from '../consts';

const RescuesScreen = ({ navigation }) => {

    const { RescuesList } = useContext(FirebaseContext)
    const [list, setList] = useState(RescuesList)
    const [query, setQuery] = useState("")

    useEffect(() => {
        const search = () => {
            const filterdList = RescuesList.filter((res) => {
                return res.name.toLowerCase().includes(query.toLowerCase()) || res.location.formattedLocation.toLowerCase().includes(query.toLowerCase())
            })
            setList(filterdList)
        }
        search()
    }, [query])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingTop: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
                </Pressable>
                <Text style={{ fontSize: 24, fontFamily: FontVariants.weight700, color: colors.secondry, textAlign: "center" }}>Rescues</Text>
            </View>
            <View style={{ marginTop: 10, paddingHorizontal: 20, }}>
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderWidth: 0.2,
                        borderColor: colors.fontGray,
                        borderRadius: 23,
                        backgroundColor: "#f8f6f8"
                    }}
                >
                    <Feather name="search" size={24} color={colors.fontGray} />
                    <TextInput onChangeText={setQuery} value={query} placeholder={'Search'} style={{ fontFamily: FontVariants.weight500, width: query.length > 0 ? "80%" : "90%", }} />
                    {query.length > 0 && <Ionicons name='close-outline' size={24} color={colors.fontGray} onPress={() => setQuery("")} />}
                </View>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#f5f5f5', marginVertical: 20, marginBottom: 0 }} />
            <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 25, }} showsVerticalScrollIndicator={false}>
                {list.map((res, index) => (
                    <RescueCard data={res} key={index} style={{width:"100%",marginBottom:20}}/>
                ))}
                {list.length === 0 &&
                    <View style={{ justifyContent: "center", alignItems: "center", height: screenHeight / 2 }}>
                        <Image source={{ uri: 'https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150199871.jpg?w=2000' }} style={{ width: 150, height: 150 }} />
                        <Text style={{ fontFamily: FontVariants.weight700, fontSize: 19, color: colors.fontGray, textTransform: "uppercase" }}>No Rescues Found</Text>
                    </View>
                }
                <View style={{ height: 120 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default RescuesScreen

const styles = StyleSheet.create({})
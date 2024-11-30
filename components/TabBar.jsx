import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const TabBar = ({ state, descriptors, navigation }) => {
    const primaryColor = '#0891b2'; 
    const greyColor = '#737373'; 


    const icons = {
        explore: (props) => <FontAwesome6 name="compass" size={20} color={props.color} {...props} />,
        nearest: (props) => <MaterialCommunityIcons name="map-marker-radius" size={20} color={props.color} {...props} />,
        scan: (props) => <MaterialCommunityIcons name="qrcode-scan" size={20} color={props.color} {...props} />,
        chatbot: (props) => <MaterialCommunityIcons name="chat" size={20} color={props.color} {...props} />,
        profile: (props) => <FontAwesome name="user" size={20} color={props.color} {...props} />,
    };

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                // Skip certain routes if necessary
                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

               
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                
                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                
                const IconComponent = icons[route.name];
                if (!IconComponent) return null;

                return (
                    <Pressable
                        key={route.name}
                        style={styles.tabbarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <IconComponent color={isFocused ? primaryColor : greyColor} />
                        <Text style={{ color: isFocused ? primaryColor : greyColor, fontSize: 10 }}>
                            {label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',  
        bottom: 0,             
        left: 0,               
        right: 0,              
        flexDirection: 'row',  
        backgroundColor: 'white', 
        paddingVertical: 15,   
        borderTopWidth: 1,     
        borderTopColor: '#ddd', 
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
});

export default TabBar;

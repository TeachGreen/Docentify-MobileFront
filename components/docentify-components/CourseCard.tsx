import React from 'react';
import {View, Text, StyleSheet, ProgressBarAndroid, Platform, TouchableOpacity} from 'react-native';
import {ProgressView} from '@react-native-community/progress-view';

const CourseCard = ({title = 'Exemplo', progress = 6, mandatory = true, style, onPress,}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.card, style]}
        >
            <View style = {[styles.badge, {backgroundColor: mandatory ? '#FFCC99' : '#D4FFD3'}]}>
                <Text style = {[styles.badgeText, {color: mandatory ? '#E96A00' : '#3B7636'}]}>
                    {mandatory ? 'Obrigatório' : 'Opcional'}
                </Text>
            </View>
            
            <Text style = {styles.title} numberOfLines = {1}>
                {title}
            </Text>

            {Platform.OS === 'android' ? (
                <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress /100} style={styles.progress} />
            ) : (
                <ProgressView progress={progress / 100} style={styles.progress} />
            )}
            <Text style={styles.progressText}> {progress}% concluído</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        
        width: 250,
        borderWidth: 1,
        borderColor: '#CBCBCB',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        fontFamily: 'Poppins-SemiBold',
    },
    progress: {
        height: 5,
        marginVertical: 5,
    },
    progressText: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Poppins-Regular',
    },

});

  
export default CourseCard;
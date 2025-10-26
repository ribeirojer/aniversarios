import { BirthdayForm } from '@/src/components/birthday-form';
import Layout from '@/src/components/Layout';
import { useBirthdays } from '@/src/hooks/useBirthdays';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Adicionar = () => {
      const {
        birthdays,
        view,
        setView,
        showForm,
        setShowForm,
        editingBirthday,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleEdit,
        daysFilter,
        setDaysFilter,
        upcomingBirthdays,
        showOnboarding,
        setShowOnboarding,
      } = useBirthdays();
    const handlePress = () => {
        console.log('Button pressed');
    };

    return (
        <Layout>
        <View style={styles.container}>

                      <View style={{ marginBottom: 32 }}>
                        <BirthdayForm
                          birthday={editingBirthday}
                          onSubmit={editingBirthday ? handleUpdate : handleAdd}
                          onCancel={() => setShowForm(false)}
                        />
                      </View>
            <Text style={styles.title}>Adicionar Página</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Clique Aqui</Text>
            </TouchableOpacity>
        </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Adicionar;
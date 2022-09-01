import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Tarefa from './src/Tarefa';

export default function App() {
	const [task, setTask] = useState('');
	const [list, setList] = useState([]);

	function handleAddTask() {
		if (task === '') return;

		const data = {
			key: Date.now(),
			item: task,
		};

		setList((oldArray) => [data, ...oldArray]);
		setTask('');
	}

	function handleDelete(item) {
		let filtroItem = list.filter((task) => {
			return task.item !== item;
		});

		setList(filtroItem);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tarefas</Text>
			<View style={styles.containerInput}>
				<TextInput
					placeholder="Insira sua tarefa aqui"
					style={styles.input}
					value={task}
					onChangeText={(text) => setTask(text)}
				/>
				<TouchableOpacity
					style={styles.buttonAdd}
					onPress={handleAddTask}>
					<FontAwesome
						name="plus-circle"
						size={30}
						color="#fff"
					/>
				</TouchableOpacity>
			</View>
			<FlatList
				data={list}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Tarefa
						data={item}
						deleteItem={() => handleDelete(item.item)}
					/>
				)}
				style={styles.list}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, .8)',
		paddingTop: 28,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		color: '#fff',
		marginTop: '5%',
		paddingStart: '5%',
		marginBottom: 12,
	},
	containerInput: {
		flexDirection: 'row',
		width: '100%',
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 22,
	},
	input: {
		width: '75%',
		backgroundColor: '#fbfbfb',
		height: 44,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
		paddingHorizontal: 10,
	},
	buttonAdd: {
		width: '15%',
		height: 44,
		backgroundColor: '#73f7ff',
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	list: {
		flex: 1,
		backgroundColor: '#fff',
		paddingStart: '4%',
		paddingEnd: '4%',
	},
});

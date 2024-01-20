import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";

const ToDoScreen = () => {

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState("");
  const [editedTodo, setEditedTodo] = useState(null);

  //* Add Todo
  const handleAddTodo = () => {

    //! Validations

    //! Empty fields
    if(!todo.trim()){
      alert("Please fill out all the fields.")
      return
    }

    setTodoList([...todoList,{id: Date.now().toString(), title: todo}]);
    setTodo("");
  }

  //* Delete Todo
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id)

    setTodoList(updatedTodoList);
  }

  //* Edit Todo
  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  }

  //* Update Todo
  const handleUpdateTodo = () => {
    //! Validations

    //! Empty fields
    if(!todo.trim()){
      alert("Please fill out all the fields.")
      return
    }
    
    const updatedTodos = todoList.map ((item) => {
      if(item.id === editedTodo.id){
        return{...item, title: todo}
      }

      return item

    });
      setTodoList(updatedTodos);
      setEditedTodo(null);
      setTodo("");
  }

  const renderTodos = ({item, index}) => {
    return(
      <View style={styles.listTodos}>
        <Text style={styles.listTodosText}>{item.title}</Text>
        <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)}></IconButton>
        <IconButton icon="trash-can" iconColor="#fff" onPress={() => handleDeleteTodo(item.id)}></IconButton>
      </View>
    )
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <TextInput value={todo} onChangeText={(userText)=> setTodo(userText)} style={styles.inputText} placeholder="Add a task"/>

      {
        editedTodo ? 
        (
          <TouchableOpacity style={styles.buttonAdd} onPress={() => handleUpdateTodo()}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonAdd} onPress={() => handleAddTodo()}>
            <Text style={styles.buttonText}>Add  +</Text>
          </TouchableOpacity>
        )
      }

      {/* Render ToDo List */}
      <FlatList data={todoList} renderItem={renderTodos}/>

    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  buttonAdd: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    marginVertical: 24,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 20
  },
  listTodos: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  listTodosText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    flex: 1
  }
});

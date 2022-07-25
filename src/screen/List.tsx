import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { IDetail } from "../interface/TodoList";
import { Surface, Title } from "react-native-paper";
import Card from "../components/CardList";
import { getList, createTodo, deleteTodo } from "../services/TodoAPI";
import ModalView from "../components/ModalView";
const List = ({ navigation }: any) => {
  const [data, setData] = useState<IDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    setLoading(true);
    const res = await getList();
    if (res.status === 200) {
      console.log("success getData");
      setData(res.data);
      setLoading(false);
    } else {
      console.log("fail getData");
      console.log(res);
      setLoading(false);
    }
  };
  const createData = async (
    data: {
      description: string;
      date: string;
      title: string;
    },
    handleCancel: any
  ) => {
    const res = await createTodo(data);
    if (res.status === 201) {
      console.log("success createData");
      getData();
      handleCancel();
    } else {
      console.log("fail createData");
      console.log(res);
    }
  };
  const deleteData = async (id: number) => {
    setLoading(true);
    const res = await deleteTodo(id);
    if (res.status === 200) {
      console.log("success delete");
      setLoading(false);
      getData();
    } else {
      console.log("fail delete");
      console.log(res);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.header}>
        <Title>To Do List App</Title>
        <ModalView
          headName="Create Todo"
          onSubmit={(
            data: {
              description: string;
              date: string;
              title: string;
            },
            handleCancel: any
          ) => createData(data, handleCancel)}
        />
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate("Detail", {
                data: item,
                functionGetData: getData,
              });
            }}
          >
            <Card
              title={item.title}
              date={item.date}
              onDelete={() => deleteData(item.id)}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "android" ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50,
  },
});
export default List;

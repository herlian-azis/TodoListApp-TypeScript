import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import ModalView from "../components/ModalView";
import { Card } from "react-native-paper";
import { getByIdTodo, editTodo } from "../services/TodoAPI";
import { IDetail } from "../interface/TodoList";

const Detail = (props: any) => {
  const { id } = props.route.params.data;
  const [loading, setLoading] = useState<boolean>(false);
  const [detailTodo, setDetailTodo] = useState<IDetail>({
    description: "",
    date: "",
    title: "",
    id: 0,
  });
  const editData = async (
    data: {
      description: string;
      date: string;
      title: string;
    },
    handleCancel: any,
    id: number
  ) => {
    setLoading(true);
    const res = await editTodo(data, id);
    if (res.status === 200) {
      console.log("success editTodo");
      setLoading(false);
      getOneData(id);
      handleCancel();
      props.route.params.functionGetData();
    } else {
      console.log("fail editTodo");
      console.log(res);
      setLoading(false);
    }
    setLoading(false);
  };
  const getOneData = async (id: number) => {
    setLoading(true);
    const res = await getByIdTodo(id);
    if (res.status === 200) {
      console.log("success getByIdTodo");
      setDetailTodo(res.data);
      setLoading(false);
    } else {
      console.log("fail getByIdTodo");
      console.log(res);
    }
    setLoading(false);
  };
  useEffect(() => {
    getOneData(id);
  }, [id]);
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
      <View style={styles.container}>
        <Card style={{ padding: 20, borderRadius: 20 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={styles.paragraph}>{detailTodo.title}</Text>
            <ModalView
              headName="Edit Todo"
              title={detailTodo.title}
              description={detailTodo.description}
              date={detailTodo.date}
              id={detailTodo.id}
              onCheck="edit"
              onSubmit={(data: any, handleCancel: any, id: number) =>
                editData(data, handleCancel, id)
              }
            />
          </View>
          <View style={{ alignContent: "flex-start" }}>
            <Text style={styles.paragraph2}>{detailTodo.description}</Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              Create :{detailTodo.date}
            </Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraph2: {
    fontSize: 14,
  },
});
export default Detail;

import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Title, TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

const Button = ({ onPress, style, icon }: any) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
);
const ModalView = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState({
    title: props.title ?? "",
    description: props.description ?? "",
    date: moment().format("DD/MM/YYYY"),
  });
  const handleCancel = () => {
    setValue({
      title: props.title ?? "",
      description: props.description ?? "",
      date: moment().format("DD/MM/YYYY"),
    });
    setVisible(!value);
  };
  return (
    <>
      {props.onCheck === "edit" ? (
        <Button
          onPress={() => setVisible(true)}
          icon="edit"
          style={{ marginHorizontal: 16 }}
        />
      ) : (
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>{props.headName}</Text>
        </TouchableOpacity>
      )}
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title style={styles.modalText}>{props.headName}</Title>
            {value.title === "" && value.description === "" ? (
              <Text style={{ color: "#f44", fontWeight: "500" }}>
                Input Title dan Description Wajib Di isi
              </Text>
            ) : null}
            <View>
              <TextInput
                theme={{ colors: { primary: "black" } }}
                label="Title"
                defaultValue={props.title}
                onChangeText={(text) => setValue({ ...value, title: text })}
                mode="outlined"
              />
              <TextInput
                label="Description"
                theme={{ colors: { primary: "black" } }}
                defaultValue={props.description}
                onChangeText={(text) =>
                  setValue({ ...value, description: text })
                }
                mode="outlined"
              />
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "white" }}
                onPress={handleCancel}
              >
                <Text style={[styles.textStyle, { color: "#00ff00" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={value.title === "" || value.description === ""}
                style={
                  value.title === "" || value.description === ""
                    ? { ...styles.button, backgroundColor: "#e4e5e9" }
                    : styles.button
                }
                onPress={() => props.onSubmit(value, handleCancel, props.id)}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#00ff00",
    marginLeft: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 8,
  },
  buttonText: {
    color: "white",
  },
  buttonCreate: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#00ff00",
  },
});

export default ModalView;

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
const Button = ({ onPress, style, icon }: any) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
);
const CardList = ({
  title,
  date,
  onDelete,
}: {
  title: string;
  date: string;
  onDelete(id: number): any;
}) => {
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text>Create: {date}</Text>
        </View>
        <View style={styles.rowView}>
          <Button onPress={onDelete} icon="trash-2" />
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
});
export default CardList;

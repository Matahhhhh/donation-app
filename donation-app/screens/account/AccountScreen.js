import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../colors";
import styled from "styled-components/native";
import axios from "axios";

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.disabled === true ? "grey" : colors.accentColor};
  margin-horizontal: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AccountScreen = ({ navigation: { setOptions }, route: { params } }) => {
  const [disable, setDisable] = useState(true);
  const [amount, setAmount] = useState();
  const placeholderText = `${params.type} Amount`;

  console.log(params.type);
  const onTransfer = async () => {
    if (params.type === "Pay") {
      const data = {
        amount: amount,
        type: "donation",
        userId: params.user.email,
      };
      try {
        const response = await axios.post(
          "http://10.0.2.2:8080/transactions",
          data,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setOptions({
      title: params.type,
    });
  }, []);

  useEffect(() => {
    if (amount) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [amount]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.accountContainer}>
          <View>
            <View style={styles.item}>
              <View style={{ ...styles.icon, borderWidth: 1 }}>
                <MaterialIcons name="attach-money" size={24} color="#2d3436" />
              </View>
              <TextInput
                value={amount}
                onChangeText={(text) => setAmount(text)}
                style={styles.textInput}
                keyboardType="numeric"
                placeholder={placeholderText}
              />
            </View>
            {params.type !== "Redeem" && (
              <View style={styles.item}>
                <View style={styles.icon}>
                  <MaterialIcons
                    name="account-balance"
                    size={36}
                    color="#2d3436"
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 18 }}>POSB eSavings Account</Text>
                  <Text style={{ fontSize: 18 }}>{params.user.bankNum}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button disabled={disable} onPress={onTransfer}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  accountContainer: {
    position: "absolute",
    width: "100%",
    height: SCREEN_HEIGHT / 4.5,
    backgroundColor: "white",
    paddingLeft: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  item: {
    flexDirection: "row",
    marginBottom: 40,
    alignItems: "center",
  },
  textInput: {
    width: SCREEN_WIDTH,
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#b2bec3",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  submitBtn: {
    backgroundColor: colors.accentColor,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
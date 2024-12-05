import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import ItemModal from "./ItemModal";
import { useAppContext } from "../AppContext";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  itemsData: Array<{ date: string; content: string[] }>;
}

const Drawer: React.FC<DrawerProps> = ({ visible, onClose, itemsData }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const { setMessages, setCurrentUserMessage } = useAppContext();

  const newChat = () => {
      setMessages([]);
      setCurrentUserMessage(undefined);
      onClose();
  }


  // Toggle a specific collapsible section
  const toggleCollapse = (date: string) => {
    setExpandedItem(expandedItem === date ? null : date);
  };

  // Handle item click
  const handleItemPress = (item: string) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  if (!visible) return null;

  return (
    <View style={styles.drawer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Chat History</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* New Case Button */}
      <TouchableOpacity style={styles.newCaseButton}
        onPress={() => newChat()}
      >
        <Text style={styles.newCaseText}>+ Start New Case</Text>
      </TouchableOpacity>

      {/* Dynamic Items */}
      <FlatList
        data={itemsData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Collapsible Header */}
            <TouchableOpacity
              style={styles.collapsibleHeader}
              onPress={() => toggleCollapse(item.date)}
            >
              <Text style={styles.itemDate}>{item.date}</Text>
            </TouchableOpacity>

            {/* Collapsible Content */}
            <Collapsible collapsed={expandedItem !== item.date}>
              <View style={styles.content}>
                {item.content.map((caseName, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleItemPress(caseName)}
                  >
                    <Text style={styles.caseText}>{caseName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Collapsible>
          </View>
        )}
      />

      {/* Modal */}
      <ItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        itemName={selectedItem}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#ffd700",
    padding: 15,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    marginTop: 0,
    fontSize: 20,
    color: "#000",
  },
  newCaseButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  newCaseText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    marginBottom: 10,
  },
  collapsibleHeader: {
    padding: 10,
    color: "#000",
    borderRadius: 5,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    paddingHorizontal: 30,
    color: "#000",
  },
  caseText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
});

export default Drawer;

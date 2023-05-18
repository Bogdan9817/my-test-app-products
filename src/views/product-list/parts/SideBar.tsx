import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import AddProduct from "./AddProduct";

export default function SideBar() {
  const [modal, setModal] = useState(false);

  const triggerModal = () => {
    setModal((prev) => !prev);
  };
  return (
    <Box className='sidebar'>
      <Button onClick={triggerModal}>Add product</Button>
      <Modal open={modal} onClose={triggerModal}>
        <div>
          <AddProduct onClose={triggerModal} />
        </div>
      </Modal>
    </Box>
  );
}

import { Button, Group, Alert, Modal } from "@mantine/core";
import { useState } from "react";
import { useVarsContext } from "../contexts/VarsContext";
import logo from "./logo.png";
export default function MyNavbar() {
  const [walAddress, setWalAddress] = useState("");
  const [opened, setOpened] = useState(false);
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { provider } = useVarsContext();

  const conWal = async () => {
    try {
      setWalAddress(await provider.send("eth_requestAccounts", []));
      setBtnVisibility(true);
    } catch (err) {
      if (err.code) {
        setOpened(true);
        setErrMsg(err.message);
      }
    }
  };
  return (
    <>
      <Group position="apart" m="16px">
        <Group>
          <img src={logo} alt="Failed" width="185px" height="50px" />
        </Group>

        <Group>
          {walAddress}
          <Button color="orange" disabled={btnVisibility} onClick={conWal}>
            Connect wallet
          </Button>
        </Group>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Metamask - RPC error"
      >
        <Alert title="Please check your Metamask wallet" color="red">
          {errMsg}
        </Alert>
      </Modal>
    </>
  );
}

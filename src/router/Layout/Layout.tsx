/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { css } from '@emotion/react';

/**
 * SPAのレイアウト.
 * ヘッダーとサイドDrawer
 */
const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  return (
    <>
      <Button
        css={styles.drawerButton}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        Open
      </Button>
      <Drawer
        colorScheme="blue"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>ページリンク</DrawerHeader>

          <DrawerBody>
            <List spacing={3}>
              <ListItem>
                <Link to="/list">
                  <Button colorScheme="blue">銘柄一覧</Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/compare">
                  <Button colorScheme="blue">銘柄比較</Button>
                </Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* メインコンテンツ */}
      <Outlet />
    </>
  );
};

const styles = {
  drawerButton: css`
  zIndex: '1',
  display: 'fixed',
  top: 0,
  left: 0,
  `,
  drawer: css`
    background: 'gray';
  `,
};

export default Layout;

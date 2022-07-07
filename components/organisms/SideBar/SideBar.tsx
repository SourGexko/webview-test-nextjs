import {
  FiBook,
  FiCode,
  FiFlag,
  FiHome,
  FiLogOut,
  FiMinus,
} from "react-icons/fi";
import { Divider } from "../../atoms";
import {
  SideBarContainer,
  SideBarFooter,
  SideBarItem,
  SideBarItemGroup,
} from "../../molecules";

export function SideBar() {
  return (
    <SideBarContainer
      initialSelectedId="dashboard"
      title="Stussy CMS"
      logo="assets/image/logo.png"
    >
      <SideBarItem id="dashboard" prefixIcon={<FiHome />}>
        대시보드
      </SideBarItem>
      <SideBarItemGroup
        id="code"
        prefixIcon={<FiCode />}
        label="코드관리"
        itemCount={4}
      >
        <SideBarItem id="codes/store" prefixIcon={<FiMinus />}>
          가맹점코드
        </SideBarItem>
        <SideBarItem id="codes/machine" prefixIcon={<FiMinus />}>
          기기코드
        </SideBarItem>
        <SideBarItem id="codes/submachine" prefixIcon={<FiMinus />}>
          부품코드
        </SideBarItem>
        <SideBarItem id="codes/program" prefixIcon={<FiMinus />}>
          프로그램코드
        </SideBarItem>
      </SideBarItemGroup>
      <SideBarItem id="manuals" prefixIcon={<FiBook />}>
        메뉴얼관리
      </SideBarItem>
      <SideBarItemGroup
        id="store"
        prefixIcon={<FiFlag />}
        label="가맹점관리"
        itemCount={1}
      >
        <SideBarItem id="stores/manage" prefixIcon={<FiMinus />}>
          가맹점별관리
        </SideBarItem>
      </SideBarItemGroup>
      <SideBarItemGroup
        id="user"
        prefixIcon={<FiFlag />}
        label="유저관리"
        itemCount={1}
      >
        <SideBarItem id="user_manage" prefixIcon={<FiMinus />}>
          유저관리
        </SideBarItem>
      </SideBarItemGroup>
      {/* <SideBarFooter>
        <SideBarItem id="logout" prefixIcon={<FiLogOut />}>
          로그아웃
        </SideBarItem>
      </SideBarFooter> */}
    </SideBarContainer>
  );
}

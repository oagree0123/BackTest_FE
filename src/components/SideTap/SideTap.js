import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import {
  SideTapWrap,
  SideUserWrap,
  UserImg,
  Username,
  UserText,
  ProfileBtn,
  TabWrap,
  Tab,
  TabTitle,
  TabContent,
  TabDesc,
  TabIcon,
  TabClicked,
  TabClickedDesc,
  TabClickedTitle,
  UserBtnWrap,
  LoginBtn,
  SignupBtn,
  LabIcon,
  ProfileWrap,
  ProfileCloseBtn,
} from "./style";

import LabClick from "../../assets/images/lab_blue.svg";
import LabGray from "../../assets/images/lab_gray.svg";
import PortfolioClick from "../../assets/images/portfolio_blue.svg";
import PortfolioGray from "../../assets/images/portfolio_gray.svg";
import CommunityClick from "../../assets/images/community_blue.svg";
import CommunityGray from "../../assets/images/community_gray.svg";
import BasicImage from '../../assets/images/basic_image.svg'

import UserProfile from "../UserProfile/UserProfile";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SideTap = (props) => {
  const location = useSelector((state) => state.router.location.pathname);
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user_info);

  const [lab_clicked, setLabClicked] = useState(true);
  const [portf_clicked, setPortfClicked] = useState(false);
  const [commu_clicked, setCommuClicked] = useState(false);
  const [profile_clicked, setProfileClicked] = useState(false);
  const [user_profile, setUserProfile] = useState(user.profile_img);

  useEffect(() => {
    if (location.includes("/community")) {
      setLabClicked(false);
      setPortfClicked(false);
      setCommuClicked(true);
    } else if (location === "/mypage") {
      setLabClicked(false);
      setPortfClicked(true);
      setCommuClicked(false);
    } else if (location === "/") {
      setLabClicked(true);
      setPortfClicked(false);
      setCommuClicked(false);
    } else if (location.includes("/detail")) {
      setLabClicked(false);
      setPortfClicked(true);
      setCommuClicked(false);
    }
  }, [lab_clicked, portf_clicked, commu_clicked, location]);

  useEffect(() => {
    setUserProfile(user.profile_img);
  }, [user]);

  return (
    <SideTapWrap>
      {is_login ? (
        <SideUserWrap>
          <UserImg img_url={user_profile ? user_profile : BasicImage} />
          <Username>{user.nickname}</Username>
          <UserText>
            오늘은 어떤 자산을 <br />
            실험해 볼까요?
          </UserText>
          <ProfileWrap>
            {profile_clicked && (
              <UserProfile setProfileClicked={setProfileClicked} />
            )}
            {profile_clicked && (
              <ProfileCloseBtn
                onClick={() => {
                  setProfileClicked(false);
                }}
              >
                x
              </ProfileCloseBtn>
            )}
            <ProfileBtn
              onClick={() => {
                setProfileClicked(!profile_clicked);
              }}
            >
              프로필 수정하기
            </ProfileBtn>
          </ProfileWrap>
        </SideUserWrap>
      ) : (
        <SideUserWrap>
          <UserImg img_url={BasicImage}/>
          <Username>방문자님</Username>
          <UserText>
            로그인을 해야 실험을 <br />
            저장할 수 있어요
          </UserText>
          <UserBtnWrap>
            <LoginBtn
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </LoginBtn>
            <SignupBtn
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </SignupBtn>
          </UserBtnWrap>
        </SideUserWrap>
      )}
      <TabWrap>
        {!lab_clicked ? (
          <Tab
            onClick={() => {
              setLabClicked(true);
              setPortfClicked(false);
              setCommuClicked(false);
              history.push("/");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={LabGray} alt="right" />
            </TabIcon>
            <TabContent>
              <TabTitle>실험실</TabTitle>
              <TabDesc>자신의 수익을 확인해보세요</TabDesc>
            </TabContent>
          </Tab>
        ) : (
          <TabClicked
            onClick={() => {
              setLabClicked(true);
              setPortfClicked(false);
              setCommuClicked(false);
              history.push("/");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={LabClick} alt="right" />
            </TabIcon>
            <TabContent>
              <TabClickedTitle>실험실</TabClickedTitle>
              <TabClickedDesc>자신의 수익을 확인해보세요</TabClickedDesc>
            </TabContent>
          </TabClicked>
        )}
        {!portf_clicked ? (
          <Tab
            onClick={() => {
              if (!is_login) {
                MySwal.fire({
                  title: "로그인이 필요한 서비스입니다.",
                  confirmButtonColor: '#0075FF',
                });
                return;
              }
              setLabClicked(false);
              setPortfClicked(true);
              setCommuClicked(false);
              history.push("/mypage");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={PortfolioGray} alt="right" />
            </TabIcon>
            <TabContent>
              <TabTitle>포트폴리오</TabTitle>
              <TabDesc>자신의 자산을 비교해 보세요</TabDesc>
            </TabContent>
          </Tab>
        ) : (
          <TabClicked
            onClick={() => {
              if (!is_login) {
                MySwal.fire({
                  title: "로그인이 필요한 서비스입니다.",
                  confirmButtonColor: '#0075FF',
                });
                return;
              }
              setLabClicked(false);
              setPortfClicked(true);
              setCommuClicked(false);
              history.push("/mypage");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={PortfolioClick} alt="right" />
            </TabIcon>
            <TabContent>
              <TabClickedTitle>포트폴리오</TabClickedTitle>
              <TabClickedDesc>자신의 자산을 비교해 보세요</TabClickedDesc>
            </TabContent>
          </TabClicked>
        )}
        {!commu_clicked ? (
          <Tab
            onClick={() => {
              setLabClicked(false);
              setPortfClicked(false);
              setCommuClicked(true);
              history.push("/community");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={CommunityGray} alt="right" />
            </TabIcon>
            <TabContent>
              <TabTitle>커뮤니티</TabTitle>
              <TabDesc>자산에 대한 정보를 얻어보세요</TabDesc>
            </TabContent>
          </Tab>
        ) : (
          <TabClicked
            onClick={() => {
              setLabClicked(false);
              setPortfClicked(false);
              setCommuClicked(true);
              history.push("/community");
              window.scrollTo(0, 0);
            }}
          >
            <TabIcon>
              <LabIcon src={CommunityClick} alt="right" />
            </TabIcon>
            <TabContent>
              <TabClickedTitle>커뮤니티</TabClickedTitle>
              <TabClickedDesc>자산에 대한 정보를 얻어보세요</TabClickedDesc>
            </TabContent>
          </TabClicked>
        )}
      </TabWrap>
    </SideTapWrap>
  );
};

export default SideTap;
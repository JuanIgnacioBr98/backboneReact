import { Box, Image } from "@mantine/core";
import React from "react";
import Facebook from "../../assets/images/socialMedia/facebookIcon.svg";
import Twitter from "../../assets/images/socialMedia/twitterIcon.svg";
import Linkedin from "../../assets/images/socialMedia/linkedinIcon.svg";
import Instagram from "../../assets/images/socialMedia/instagramIcon.svg";
import { makeStyles } from "./styles";

const SocialMediaBar = () => {
  const styles = makeStyles();

  return (
    <Box
      style={styles.socialMediaBarContainer}
      className="socialMediaBar-container"
    >
      <Image
        style={styles.socialMediaBarContainerImage}
        onClick={() => {}}
        src={Facebook}
      />
      <Image
        style={styles.socialMediaBarContainerImage}
        onClick={() => {}}
        src={Twitter}
      />
      <Image
        style={styles.socialMediaBarContainerImage}
        onClick={() => {}}
        src={Linkedin}
      />
      <Image
        style={styles.socialMediaBarContainerImage}
        onClick={() => {}}
        src={Instagram}
      />
    </Box>
  );
};

export default SocialMediaBar;

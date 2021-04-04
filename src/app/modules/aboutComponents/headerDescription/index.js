import React, { Component, memo, useEffect, useState } from "react";
import { Transition, config } from "react-spring/renderprops";
import Div from "Common/components/div";
import styles from "./header_description.module.scss";
import ContactComponent from "Common/components/contactComponent";
import Flag from 'react-world-flags'

const HeaderDescription = ({
  showDescription,
  onClickProject,
  onClickTimeline,
  onClickAboutMe,
  onClickEducation,
  isFirstTime
}) => {

  return (
    <Transition
      items={showDescription}
      from={{
        opacity: 0,
        transform: "translateY(calc(50vh - 0px))"
      }}
      enter={{
        opacity: 1,
        transform: "translateY(calc(50vh - 145px))"
      }}
      leave={{
        opacity: 0
      }}
      config={isFirstTime ? { delay: 300 } : config.default}
    >
      {showDescription =>
        showDescription &&
        (props => (
          <Div style={props} className={styles.user_description_container}>
            <div className={styles.user_description}>
              Hello! Hola! <b className={styles.name}>I am Yadiel Cordero Badillo</b> 
              .An avid enthusiast of all things tech, A relentless learner and above all a<b className={styles.name}> Problem Solver</b>.
              {/* <br/><br/> In my spare time, I usually read or play video games but mostly i try to work on new ideas and learn. */}
            </div>

            <Div row align className={styles.user_button_container}>
              Checkout my
              <Div
                align
                className={styles.user_button}
                onClick={onClickTimeline}
              >
                Timeline
                <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className={styles.user_button}
                onClick={onClickProject}
              >
                Technologies
                <Underline isFirstTime={isFirstTime} />
              </Div>
              that I worked on. To learn more 
            </Div>
            <Div
            align
                className={styles.user_button}
                onClick={onClickProject}
              >
                About me 
                <Underline isFirstTime={isFirstTime} />
                <Flag code="pr" height="16" />
                </Div>
                <Div
             align
                className={styles.user_button}
                onClick={onClickTimeline}
                ></Div>

            <Div row align className={styles.user_button_container}>
              For more see:
              <Div
                align
                className={styles.user_button}
                onClick={onClickAboutMe}
              >
                About me
                <Underline isFirstTime={isFirstTime} />
              </Div>
              and
              <Div
                align
                className={styles.user_button}
                onClick={onClickEducation}
              >
                Education
                <Underline isFirstTime={isFirstTime} />
              </Div>
            </Div>

            <ContactComponent className={styles.contact_container} />
          </Div>
        ))
      }
    </Transition>
  );
};

const Underline = ({ isFirstTime }) => (
  <Transition
    items={true}
    from={{
      transform: isFirstTime ? "scale(0)" : "scale(1)"
    }}
    enter={{
      transform: "scale(1)"
    }}
    config={{ delay: 800 }}
  >
    {showUnderline =>
      (props => (
        <div
          style={props}
          className={`${styles.underline} ${styles.show_underline}`}
        ></div>
      ))
    }
  </Transition>
);


export default memo(HeaderDescription);

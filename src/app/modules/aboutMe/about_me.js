import React, { Component } from "react";
import styles from "./about_me.scss";
import Div from "Common/components/div";
import { techList } from "Constants/techConstants";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import techDoodleImage from "Images/background/tech-doodle-background-image.png";
import { random } from "Common/utils";
import { getImagePosition, getBackgroundTransition } from './about_me_helper';

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
    const selectedTechId = 'react';
    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedTechId, imageAlignment);
    const backgroundTransition = getBackgroundTransition(
      selectedTechId,
      imageAlignment,
      this.isFirstAnimation
    );

    this.state = {
      selectedTechId,
      techTransitionAnimation: {
        react: {
          ...backgroundTransition,
          imagePosition
        }
      }
    }
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTechSelected = ({ selectedId }) => {
    const { techTransitionAnimation } = this.state;

    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedId, imageAlignment);
    const backgroundTransition = getBackgroundTransition(
      selectedId,
      imageAlignment,
      this.isFirstAnimation,
    );

    this.setState({
      selectedTechId: selectedId, techTransitionAnimation: {
        ...techTransitionAnimation,
        [selectedId]: {
          ...backgroundTransition,
          imagePosition
        }
      }
    });
  };

  render() {
    const { selectedTechId, techTransitionAnimation } = this.state;

    const tech = find(techList, techItem => {
      return techItem.id === selectedTechId;
    });

    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <img src={techDoodleImage} className={styles.background_static_image} />

        <Transition
          items={tech}
          keys={tech => tech.id}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {tech => tech.id && (
            value => {
              const { imagePosition, from, enter, leave } = techTransitionAnimation[tech.id];
              const fromAnimation = tech.id == selectedTechId ? from : enter;
              const toAnimation = tech.id == selectedTechId ? enter : leave;
              const isReactRelated =
                tech.id === "react" ||
                tech.id === "react-native" ||
                tech.id === "electron";

              return (
                <Spring
                  from={{
                    opacity: isReactRelated ? fromAnimation.opacity : 1,
                    transform: fromAnimation.transform,
                  }}
                  to={{
                    opacity: isReactRelated ? toAnimation.opacity : 1,
                    transform: toAnimation.transform,
                  }}
                >
                  {
                    props => (
                      <Div
                        style={{
                          opacity: isReactRelated ? props.opacity : 1,
                          transform: !isReactRelated ? props.transform : "unset"
                        }}
                        className={styles.background_image_container}
                      >
                        <img
                          src={tech.backgroundImage}
                          style={{
                            left: imagePosition.left,
                            right: imagePosition.right,
                            top: imagePosition.top,
                            bottom: imagePosition.bottom,
                            transform: tech.id == 'android' ? imagePosition.transform : props.transform
                          }}
                          className={styles.background_image}
                        ></img>
                      </Div>
                    )
                  }
                </Spring>
              )
            }
          )}
        </Transition>
      </Div>
    );
  }
}

export default AboutMe;
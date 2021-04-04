import React, { Component } from "react";
import Div from "Common/components/div";
import { landingPageBody } from "Constants/landingConstants";
import { timelineListValue } from "Constants/timelineConstants";
import { projectsListValue } from "Constants/projectsConstants";
import { withRouter } from "react-router";
import find from "lodash/find";
import styles from "./about_me_mobile.module.scss";
import { detectSwipe } from 'Common/utils/swipeGesture';

class AboutMeMobile extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      selectedTimelineId: "nykaa",
      currentSlide: 0,
      projectsList: []
    }
  }

  componentDidMount() {
    const { selectedTimelineId } = this.state;

    this.setState({
      projectsList: this.getProjects(selectedTimelineId)
    });


    detectSwipe(this.containerRef.current, (direction) => {
      const { selectedTimelineId } = this.state;
      const { updateBodyType } = this.props;
      const index = timelineListValue.findIndex((element) => element.id === selectedTimelineId);


      if (direction == 'l') {
        if (index < timelineListValue.length-1) {
          this.onTimelineSelected({ selectedId: timelineListValue[index + 1].id })
        } else {
          updateBodyType(landingPageBody.PROJECT);
        }
      } else if (direction == 'r') {
        if (index != 0) {
          this.onTimelineSelected({ selectedId: timelineListValue[index - 1].id })
        } else {
          this.onTimelineSelected({ selectedId: timelineListValue[timelineListValue.length - 1].id })
        }
      }
    });
  }

  onSwiperMount = (swiper) => {
    this.swiper = swiper;
    swiper.el.addEventListener('touchstart', e => e.stopPropagation(), false);
  }

  getProjects = selectedId => {
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedId;
    });

    return timeline.projects.map(project => ({
      ...projectsListValue[project],
      slug: project
    }));
  };

  onTimelineSelected = ({ selectedId }) => {
    const projectsList = this.getProjects(selectedId);
    this.setState({ selectedTimelineId: selectedId, projectsList, currentSlide: 0 }, () => {
      this.swiper.slideTo(0);
    });
  };

  render() {
    const { selectedTimelineId, projectsList, currentSlide } = this.state;
    const timeline = find(timelineListValue, timelineItem => {
      return timelineItem.id === selectedTimelineId;
    });
    const totalItems = projectsList ? projectsList.length : 0;

    const params = {
      containerClass: "custom_container",
      slidesPerView: 2,
      centeredSlides: true,
      shouldSwiperUpdate: true,
      on: {
        slideChange: () =>
          this.setState({ currentSlide: this.swiper.realIndex })
      }
    };

    return (
      <Div passRef={this.containerRef} fillParent className={styles.timeline_container}>
        {/* Background div image */}
        <Div className={styles.image_container}>
          {timelineListValue.map((timelineValue, index) => {
            if (timelineValue.id === selectedTimelineId) {
              return (
                <img
                  key={index}
                  className={`${styles.image} ${styles.selected_image}`}
                  src={timelineValue.backgroundImage}
                />
              );
            }

            return (
              <img
                key={index}
                className={styles.image}
                src={timelineValue.backgroundImage}
              />
            );
          })}
        </Div>
      </Div>
    );
  }
}


export default withRouter(AboutMeMobile);

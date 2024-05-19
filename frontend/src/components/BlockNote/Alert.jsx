import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec, createReactInlineContentSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import { MdCheckCircle, MdError, MdPlayCircle } from "react-icons/md";
import "./ToggleType.css";
import { CaretRightFill } from 'react-bootstrap-icons';

// The types of alerts that users can choose from.
export const Toggles = [
  {
    title: "할당됨",
    value: "ASSIGNED",
    icon: MdError,
    color: "#e69819",
    backgroundColor: {
      light: "#fff6e6",
      dark: "#805d20",
    },
  },
  {
    title: "진행중",
    value: "PROGRESS",
    icon: MdPlayCircle,
    color: "#d80d0d",
    backgroundColor: {
      light: "#ffe6e6",
      dark: "#802020",
    },
  },
  {
    title: "완료됨",
    value: "COMPLETED",
    icon: MdCheckCircle,
    color: "#0bc10b",
    backgroundColor: {
      light: "#e6ffe6",
      dark: "#208020",
    },
  },
  {
    title: "승인됨",
    value: "APPROVED",
    icon: MdCheckCircle,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
];

export const Mention = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      userName: {
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: (props) => (
      <span style={{ backgroundColor: "#8400ff33" }}>
        @{props.inlineContent.props.userName}
      </span>
    ),
  }
);

// The Alert block.
export const Alert = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "ASSIGNED",
        values: ["ASSIGNED", "COMPLETED", "COMPLETED", "APPROVED"],
      },
      mention: {
        default: '멘션',
      },
      img: {
        default: 'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
      }
    },
    content: "inline",
  },
  {
    render: (props) => {
      const Toggle = Toggles.find(
        (a) => a.value === props.block.props.type
      );
      const Icon = Toggle.icon;
      return (
        <div className={"alert"} data-alert-type={props.block.props.type}>
          {/*Icon which opens a menu to choose the Alert type*/}
          <Menu withinPortal={false} zIndex={999999}>
            <Menu.Target>
              <div className={"alert-icon-wrapper"} contentEditable={false}>
                <Icon
                  className={"alert-icon"}
                  data-alert-icon-type={props.block.props.type}
                  size={32}
                />
              </div>
            </Menu.Target>
            {/*Dropdown to change the Alert type*/}
            <Menu.Dropdown>
              <Menu.Label>Toggle Type</Menu.Label>
              <Menu.Divider />
              {Toggles.map((type) => {
                const ItemIcon = type.icon;
 
                return (
                  <Menu.Item
                    key={type.value}
                    leftSection={
                      <ItemIcon
                        className={"alert-icon"}
                        data-alert-icon-type={type.value}
                      />
                    }
                    onClick={() =>
                      props.editor.updateBlock(props.block, {
                        type: "alert",
                        props: { type: type.value,
                                mention:props.block.props.mention,
                              img:props.block.props.img },
                      })
                    }>
                    {type.title}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
          {/*Rich text field for user to type in*/}
          <div className={"inline-content"} ref={props.contentRef} />
          <img styles="width:30px; height:30px; border-radius:50%" src={props.block.props.img}/>
          <div className="name">
          {props.block.props.mention}
          </div>
          
          
        </div>
      );
    },
  }
);

// The Alert block.
export const Agenda = createReactBlockSpec(
  {
    type: "agenda",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "ASSIGNED",
        values: ["ASSIGNED", "COMPLETED", "COMPLETED", "APPROVED"],
      },
      mention: {
        default: '멘션',
      },
      assignee: {
        default: '수신자',
      },
      assigneeimg: {
        default: 'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
      },
      mentionimg: {
        default: 'https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
      }
    },
    content: "inline",
  },
  {
    render: (props) => {
      const Toggle = Toggles.find(
        (a) => a.value === props.block.props.type
      );
      const Icon = Toggle.icon;
      return (
        <div className={"alert"} data-alert-type={props.block.props.type}>
          {/*Icon which opens a menu to choose the Alert type*/}
          <Menu withinPortal={false} zIndex={999999}>
            <Menu.Target>
              <div className={"alert-icon-wrapper"} contentEditable={false}>
                <Icon
                  className={"alert-icon"}
                  data-alert-icon-type={props.block.props.type}
                  size={32}
                />
              </div>
            </Menu.Target>
            {/*Dropdown to change the Alert type*/}
            <Menu.Dropdown>
              <Menu.Label>Toggle Type</Menu.Label>
              <Menu.Divider />
              {Toggles.map((type) => {
                const ItemIcon = type.icon;
 
                return (
                  <Menu.Item
                    key={type.value}
                    leftSection={
                      <ItemIcon
                        className={"alert-icon"}
                        data-alert-icon-type={type.value}
                      />
                    }
                    onClick={() =>
                      props.editor.updateBlock(props.block, {
                        type: "alert",
                        props:{type:type.value,
                              assignee:props.block.props.name,
                              mention:props.block.props.userName,
                              assigneeimg:props.block.props.assigneeimg,
                              mentionimg:props.block.props.mentionimg}
                      })
                    }>
                    {type.title}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
          {/*Rich text field for user to type in*/}
          <div className={"inline-content"} ref={props.contentRef} />
          <img styles="width:30px; height:30px; border-radius:50%" src={props.block.props.mentionimg}/>
          <div className="name">
          {props.block.props.mention}
          </div>
          <CaretRightFill className="caret" />
          <img styles="width:30px; height:30px; border-radius:50%" src={props.block.props.assigneeimg}/>
          <div className="name">
          {props.block.props.assignee}
          </div>
          
          
        </div>
      );
    },
  }
);
import React, { useState, useEffect } from "react";
import styles from "./Messages.module.scss";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ConversationListItem from "./ConversationListItem";
import clsx from "clsx";
import * as _ from "lodash";
import TextField from "../../components/TextField";
import { Paperclip, MoreVertical, Archive, Trash } from "react-feather";
import { Popover } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Avatar } from "@material-ui/core";
import Chat from "./Chat";
import SharedFile from "./SharedFile";
import SVG from "react-inlinesvg";

const ChevronSVG = () => {
  return <SVG src={`${process.env.PUBLIC_URL}/images/chevron-down.svg`} />;
};

const Messages = () => {
  const allConversations = [
    {
      selected: false,
      archived: false,
      unreadMessages: 3,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      messages: [
        {
          id: false,
          message: `Nope I didn't receive anything yet.`,
        },
        {
          id: false,
          message: `Perfect, got it.`,
        },
        {
          id: true,
          message: `Everything is all set to go for the campaign.`,
        },
        {
          id: true,
          message: `We are excited to work with you and we will keep you updated.`,
        },
        {
          id: false,
          message: `Okay Thanks.`,
        },
        {
          id: true,
          message: `Could you upload the first post so that my team and I can take alook? thanks..`,
        },
        {
          id: false,
          message: `I uploaded the first post on the 9th and I also added the URL. Let me know if you got it.`,
        },
        {
          id: true,
          message: `Okay Yes I did get that.`,
        },
        ,
        {
          id: false,
          message: `Okay Thanks.`,
        },
        {
          id: true,
          message: `Could you upload the first post so that my team and I can take alook? thanks..`,
        },
        {
          id: false,
          message: `I uploaded the first post on the 9th and I also added the URL. Let me know if you got it.`,
        },
        {
          id: true,
          message: `Okay Yes I did get that.`,
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 1,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: false,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Donna McAlister",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      archived: true,
      unreadMessages: 0,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Sam Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
    {
      selected: false,
      archived: true,
      unreadMessages: 2,
      time: "12:49pm",
      members: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
          memberName: "Last Ozkural",
        },
      ],
      message:
        "Hey I sent through the microsite for approval, let me know if you got it otherwise I can resubmit.",
    },
  ];
  const [active, setActive] = useState("All");
  const [conversations, setConversations] = useState(allConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [displayedConversations, setDisplayedConversations] = useState(
    allConversations
  );
  const [indexStored, setIndexStored] = useState(-1);
  const [sharedFilesSelected, setSharedFilesSelected] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [showShadowClass, setShowShadowClass] = useState(false);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover2" : undefined;
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleSharedFiles = () => {
    setAnchorEl(null);
    setSharedFilesSelected(true);
  };
  const handleBack = () => {
    setSharedFilesSelected(false);
  };
  const setShadowClass = (show) => {
    setShowShadowClass(show);
  };

  const handleSelectedConversation = (conversation, index) => {
    setIndexStored(index);
    if (index != indexStored) {
      const conv = [...conversations];
      conv[index].selected = true;
      conv[index].unreadMessages = 0;
      if (indexStored != -1) {
        conv[indexStored].selected = false;
      }
      setSelectedConversation(conversation);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getTitle = (members) => {
    switch (members.length) {
      case 1:
        return members[0].memberName;
      case 2:
        return `${members[0].memberName}, ${members[1].memberName}`;
      default:
        return (
          <span>
            {members[0].memberName}, {members[1].memberName},{" "}
            <span className={styles.titleStyle} onClick={handleClick2}>
              +{members.length - 2} others
            </span>
          </span>
        );
    }
  };

  const filterConversations = (filterType) => {
    let convs = [...conversations];
    switch (filterType) {
      case "All":
        setDisplayedConversations(convs);
        break;
      case "Unread":
        convs = _.filter(convs, "unreadMessages");
        setDisplayedConversations(convs);
        break;
      case "Read":
        convs = _.filter(convs, ["unreadMessages", 0]);
        setDisplayedConversations(convs);
        break;
      case "Archived":
        convs = _.filter(convs, "archived");
        setDisplayedConversations(convs);
        break;
    }
  };

  useEffect(() => {
    setSelectedConversation(null);
  }, [conversations]);

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={styles.popOver}>
          {/* <div>
            <Archive /> <p>Archive Conversation</p>
          </div> */}
          {/* <div>
            <Paperclip /> <p onClick={handleSharedFiles}>View Shared Files</p>
          </div> */}
          <div>
            <Trash /> <p>Delete Conversation</p>
          </div>
        </div>
      </Popover>
      {open2 && (
        <Popover
          id={id2}
          open={open2}
          anchorEl={anchorEl2}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={styles.popOver2}>
            {selectedConversation &&
              selectedConversation !== null &&
              selectedConversation.members.map(
                (item, index) => index > 1 && <div>{item.memberName}</div>
              )}
          </div>
        </Popover>
      )}

      <div
        className={clsx(selectedConversation !== null ? styles.container : "")}
      >
        <div
          className={clsx(
            styles.mainContainer,
            selectedConversation !== null ? styles.conversationDetail : ""
          )}
        >
          <div className={styles.conversationsSection}>
            <div className={styles.headingAndButtonsContainer}>
              <div className={styles.headingAndDropdown}>
                <span>Messages</span>
                <p>
                  Newest to oldest <ExpandMoreIcon fontSize="small" />
                </p>
              </div>
              <button onClick={() => setSelectedConversation({})}>
                <AddIcon /> New Message
              </button>
            </div>
            <div className={styles.messageFiltersContainer}>
              <button
                className={active === "All" ? styles.active : ""}
                onClick={() => {
                  setActive("All");
                  filterConversations("All");
                  setSharedFilesSelected(false);
                }}
              >
                All
              </button>
              <button
                className={active === "Unread" ? styles.active : ""}
                onClick={() => {
                  setActive("Unread");
                  filterConversations("Unread");
                  setSharedFilesSelected(false);
                }}
              >
                Unread
              </button>
              <button
                className={active === "Read" ? styles.active : ""}
                onClick={() => {
                  setActive("Read");
                  filterConversations("Read");
                  setSharedFilesSelected(false);
                }}
              >
                Read
              </button>
              {/* <button
                className={active === 'Archived' ? styles.active : ''}
                onClick={() => {
                  setActive('Archived');
                  filterConversations('Archived');
                  setSharedFilesSelected(false);
                }}
              >
                Archived
              </button> */}
            </div>
            <div
              className={clsx(
                styles.conversationsContainer,
                selectedConversation !== null
                  ? styles.chatContainerSelected
                  : ""
              )}
            >
              {displayedConversations.map((conversation, index) => (
                <ConversationListItem
                  handleItemClick={handleSelectedConversation}
                  conversation={conversation}
                  key={index}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        {selectedConversation !== null &&
          (sharedFilesSelected ? (
            <>
              <div className={styles.chatContainer}>
                <div className={styles.topAvatarConatiner}>
                  <div className={styles.backToConv} onClick={handleBack}>
                    <span>
                      <ChevronSVG />
                    </span>
                    <p>Back to conversation</p>
                  </div>
                  <div className={styles.ShareFileHeading}>Shared Files</div>
                  <div className={styles.avatarContainer}>
                    <>
                      {selectedConversation.members.length > 1 ? (
                        <AvatarGroup max={5}>
                          {selectedConversation.members.map((member, index) => (
                            <Avatar key={index} src={member.imgUrl} />
                          ))}
                        </AvatarGroup>
                      ) : (
                        <Avatar
                          src={
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                          }
                        />
                      )}
                    </>
                    <div className={styles.titleAndMessageContainer}>
                      <span className={styles.title}>
                        {getTitle(selectedConversation.members)}
                      </span>
                    </div>
                  </div>
                </div>
                <SharedFile />
                {/* <Chat messages={selectedConversation.messages} /> */}
              </div>
            </>
          ) : (
            // Object.keys(selectedConversation).length === 0 ?
            //   <div style={{ width: '885px' }}>Msg Details</div> :
            <div className={styles.chatContainer}>
              {Object.keys(selectedConversation).length === 0 ? (
                <div className={styles.topInputConatiner}>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Type in the recipient"
                    variant="outlined"
                  />
                </div>
              ) : (
                <>
                  <div className={styles.topAvatarConatiner}>
                    <div></div>
                    <div className={styles.avatarContainer}>
                      <>
                        {selectedConversation.members.length > 1 ? (
                          <AvatarGroup max={5}>
                            {selectedConversation.members.map(
                              (member, index) => (
                                <Avatar key={index} src={member.imgUrl} />
                              )
                            )}
                          </AvatarGroup>
                        ) : (
                          <Avatar
                            src={
                              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                            }
                          />
                        )}
                      </>
                      <div className={styles.titleAndMessageContainer}>
                        <span className={styles.title}>
                          {getTitle(selectedConversation.members)}
                        </span>
                      </div>
                    </div>
                    <MoreVertical onClick={handleClick} />
                  </div>
                  <Chat
                    setShadowClass={setShadowClass}
                    messages={selectedConversation.messages}
                  />
                </>
              )}
              <div
                className={clsx(
                  showShadowClass ? styles.boxShadow : "",
                  styles.inputContainer
                )}
              >
                {/* <Paperclip /> */}
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Type your message"
                  variant="outlined"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Messages;

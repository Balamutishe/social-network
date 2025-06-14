import { UseMutationResult } from "@tanstack/react-query";
import { FC } from "react";
import { TMessage, TMessagesList } from "../../api/messages/types.ts";
import AddMessageForm from "../AddItemForm/AddItemForm.tsx";
import { List } from "../List/List.tsx";
import { Pagination } from "../Pagination/Pagination.tsx";
import { MessageItem } from "./MessageItem.tsx";
import c from "./Messages.module.css";

type TMessagesProps = {
  messagesList: TMessagesList;
  pageCount: number;
  createMessage: UseMutationResult<
    TMessage,
    Error,
    { formText: string; chatId?: string },
    unknown
  >;
  deleteMessage: UseMutationResult<string, Error, string, unknown>;
  activeChatId: string;
};

export const Messages: FC<TMessagesProps> = ({
  messagesList,
  pageCount,
  deleteMessage,
  createMessage,
  activeChatId,
}) => {
  return (
    <div className={c.messages}>
      <div>
        <div className={c.header}>
          <h2 className={c.title}>Messages</h2>
          <Pagination pageCount={pageCount} path={`/dialogs/${activeChatId}`} />
        </div>
        <List
          listItems={messagesList.map((message) => (
            <li key={crypto.randomUUID()}>
              <MessageItem deleteMessage={deleteMessage} message={message} />
            </li>
          ))}
          listLength={messagesList.length}
        />
      </div>
      <AddMessageForm
        createItem={createMessage}
        inputPlaceholder={"Введите текст сообщения"}
      />
    </div>
  );
};

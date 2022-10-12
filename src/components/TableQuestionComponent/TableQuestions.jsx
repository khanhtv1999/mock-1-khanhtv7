import * as React from "react";
import styled from "styled-components";
import { Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuiz } from "../../features/quiz/searchQuizSlice";
import { useEffect } from "react";
import defaultImg from "../../assets/images/defaultImage.png";
import { deleteQuiz } from "../../features/quiz/quizSlice";
import { fetchQuizbyId } from "../../features/quiz/quizSlice";
import { Pagination } from "../PaginationComponent";
import { ModalUpdateQuestion } from "../ModalComponents";
import { openModalUpdateQuestion } from "../../features/quiz/searchQuizSlice";

const TableQuestion = () => {
  var moment = require("moment");
  const { user } = useSelector((store) => store.user);
  const { sort, searchType, currentPage, search, quizs, totalPages } =
    useSelector((store) => store.searchQuiz);
  const { deleteQuizSucces } = useSelector((store) => store.quiz);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllQuiz({
        token: user.access_token,
        sort: sort,
        searchType: searchType,
        currentPage: currentPage,
        search: search,
      })
    );
  }, [search, sort, searchType, currentPage, deleteQuizSucces]);
  const confirm = (id) => {
    dispatch(deleteQuiz({ id: id, token: user.access_token }));
  };
  const handleUpdate = (id) => {
    dispatch(openModalUpdateQuestion());
    dispatch(fetchQuizbyId({ id: id, token: user.access_token }));
  };
  return (
    <Wrapper>
      <ModalUpdateQuestion />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Date created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {quizs.map((item) => {
            return (
              <tr key={item.id}>
                <th>{item.title}</th>
                <td>
                  <img
                    className="img"
                    src={item.thumbnail_link ? item.thumbnail_link : defaultImg}
                  />
                </td>
                <td>
                  {moment(item.createdAt).format("h:mm:ss a,MMMM Do YYYY")}
                </td>
                <td>
                  <svg
                    onClick={() => handleUpdate(item.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0099e6"
                    className="w-6 h-6"
                  >
                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>

                  <Popconfirm
                    placement="topLeft"
                    title="Are you sure to delete quiz?"
                    onConfirm={() => confirm(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#ef3d44"
                      className="w-6 h-6"
                    >
                      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </Popconfirm>
                </td>
              </tr>
            );
          })}
        </tbody>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          feature={"question"}
        />
      </table>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  font-family: "Inter", sans-serif;
  color: #343a40;
  line-height: 1;
  display: flex;
  justify-content: center;
  table {
    width: 100%;
    max-width: 100%;
    margin-top: 100px;
    font-size: 18px;

    border-collapse: collapse;
  }

  th,
  td {
    padding: 16px 24px;
    text-align: left;
  }

  thead tr {
    background-color: #fff;
    color: #000;
  }

  thead th {
    width: 25%;
  }

  tbody tr:nth-child(odd) {
    background-color: #f8f9fa;
  }

  tbody tr:nth-child(even) {
    background-color: #e9ecef;
  }
  img {
    height: 50%;
    width: 50%;
    object-fit: contain;
  }
  .w-6 {
    width: 3.5rem;
    margin-right: 1rem;
    cursor: pointer;
  }
  .h-6 {
    height: 3.5rem;
  }
`;
export default TableQuestion;

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


// actions
const SET_START = "SET_START";
const SET_END = "SET_END";
const SET_MONEY = "SET_MONEY";
const SET_STOCK = "SET_STOCK";
const SET_REBALANCE = "SET_REBALANCE";
const DELETE_STOCK = "DELETE_STOCK";
const SET_INIT = "SET_INIT";

// action creators
const setStart = createAction(SET_START, (start_year, start_month) => ({ start_year, start_month }));
const setEnd = createAction(SET_END, (end_year, end_month) => ({ end_year, end_month }));
const setMoney = createAction(SET_MONEY, (money) => ({ money }));
const setStock = createAction(SET_STOCK, (ratio, stock_name, stock_code) => ({ ratio, stock_name, stock_code }));
const setRebalance = createAction(SET_REBALANCE, (rebalance) => ({ rebalance }));
const deleteStock = createAction(DELETE_STOCK, (stock_num) => ({ stock_num }));
const setInit = createAction(SET_INIT, () => ({}));

// initialState
const initialState = {
  start_date: "",
  end_date: "",
  init_money: 0,
  rebalance_month: 0,
  stockList: [],
  ratioList: [],
  codeList: [],
};

// middlewares

// reducer
export default handleActions(
  {
    [SET_START]: (state, action) =>
      produce(state, (draft) => {
        let start_date = '';
        if (action.payload.start_month < 10) {
          start_date = dayjs(`${action.payload.start_year}-0${action.payload.start_month}-01`).format('YYYY-MM-DD');
        }
        else {
          start_date = dayjs(`${action.payload.start_year}-${action.payload.start_month}-01`).format('YYYY-MM-DD');
        }
        draft.start_date = start_date;
      }),
    [SET_END]: (state, action) =>
      produce(state, (draft) => {
        let end_date = '';
        if (action.payload.end_month < 10) {
          end_date = dayjs(`${action.payload.end_year}-0${action.payload.end_month}-01`).format('YYYY-MM-DD');
        }
        else {
          end_date = dayjs(`${action.payload.end_year}-${action.payload.end_month}-01`).format('YYYY-MM-DD');
        }
        draft.end_date = end_date;
      }),
    [SET_MONEY]: (state, action) =>
      produce(state, (draft) => {
        draft.init_money = action.payload.money;
      }),
    [SET_STOCK]: (state, action) =>
      produce(state, (draft) => {
        if (draft.stockList.length >= 5) {
          MySwal.fire({
            title: "주식 종목은 5개 까지만 가능합니다.",
            confirmButtonColor: '#0075FF',
          });
          return;
        }

        if (draft.stockList.includes(action.payload.stock_name)) {
          MySwal.fire({
            title: "이미 추가된 종목입니다.",
            confirmButtonColor: '#0075FF',
          });
          return;
        }

        let ratio_sum = 0;

        draft.ratioList.map((r, i) => {
          ratio_sum += parseInt(r);
        })

        if (ratio_sum + parseInt(action.payload.ratio) > 100) {
          MySwal.fire({
            title: "자산 비율은 100%를 넘을 수 없습니다.",
            confirmButtonColor: '#0075FF',
          });
          return;
        }

        draft.stockList.push(action.payload.stock_name);
        draft.ratioList.push(parseInt(action.payload.ratio));
        draft.codeList.push(action.payload.stock_code);
      }),
    [SET_REBALANCE]: (state, action) =>
      produce(state, (draft) => {
        draft.rebalance_month = action.payload.rebalance;
      }),
    [DELETE_STOCK]: (state, action) =>
      produce(state, (draft) => {
        draft.stockList = draft.stockList.filter((n, i) => {
          return action.payload.stock_num !== i;
        })
        draft.ratioList = draft.ratioList.filter((r, i) => {
          return action.payload.stock_num !== i;
        })
        draft.codeList = draft.codeList.filter((c, i) => {
          return action.payload.stock_num !== i;
        })
      }),
    [SET_INIT]: (state, action) =>
      produce(state, (draft) => {
        draft.stockList = [];
        draft.ratioList = [];
        draft.codeList = [];
        draft.init_money = 0;
        draft.end_date = "2022-01-01";
        draft.start_date = "2011-01-01";
        draft.rebalance_month = 0;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setStart,
  setEnd,
  setMoney,
  setStock,
  deleteStock,
  setInit,
  setRebalance,
};

export { actionCreators };

import { createAction, handleActions } from "redux-actions";

// 액션 타입 상수 선언
const START_LOADING = "loading/START_LOADING";
const END_LOADING = "loading/END_LOADING";

// 로딩시작/종료 액션 생성 함수
export const startLoading = createAction(START_LOADING, actionType => actionType);
export const endLoading = createAction(END_LOADING, actionType => actionType);

// 모듈 초기상태 선언
const initialState = {}

// redux 액션에 따른 처리
const loading = handleActions(
    {
        [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true
        }),
        [END_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false
        })
    },
    initialState
)

export default loading
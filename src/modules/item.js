import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import { fetchItemApi, fetchItemListApi } from "../lib/api";

import { startLoading, endLoading } from "./loading";

// 액션 타입 상수 선언(상세)
const FETCH_SUCCESS = "item/FETCH_SUCCESS";
const FETCH_FAILURE = "item/FETCH_FAILURE";

export const FETCH_ITEM = "item/FETCH_ITEM";

// 액션 타입 상수 선언(목록)
const FETCH_LIST_SUCCESS = "item/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "item/FETCH_LIST_FAILURE";

export const FETCH_ITEM_LIST = "item/FETCH_ITEM_LIST";

// 상세 액션 생성 함수
export const fetchSuccess = createAction(FETCH_SUCCESS, data => data);
export const fetchFailure = createAction(FETCH_FAILURE, e => e);
// 상세 조회 액션 생성 함수
export const fetchItem = createAction(FETCH_ITEM, itemId => itemId);


// 목록 액션 생성 함수
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, data => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, e => e);
// 목록 조회 액션 생성 함수
export const fetchItemList = createAction(FETCH_ITEM_LIST);



/// 태스트 ///

// 상세 조회 태스크
function* fetchItemSaga(action) {
    yield put(startLoading(FETCH_ITEM)) // 상세 조회 전 로딩 시작( FETCH_ITEM 에 대한 로딩 )
    try {
        const response = yield call(fetchItemApi, action.payload)
        yield put(fetchSuccess(response.data))
    } catch(e) {
        yield put(fetchFailure(e))
    }
    yield put(endLoading(FETCH_ITEM))   // FETCH_ITEM 에 대한 로딩 종료
}

// 목록 조회 태스크
function* fetchItemListSaga() {
    yield put(startLoading(FETCH_ITEM_LIST)) // 목록 조회 전 로딩 시작( FETCH_ITEM_LIST 에 대한 로딩 )
    try {
        
        const response = yield call(fetchItemListApi)
        console.log(response)

        yield put(fetchListSuccess(response.data.data))
    } catch(e) {
        yield put(fetchListFailure(e))
    }
    yield put(endLoading(FETCH_ITEM_LIST))  // FETCH_ITEM_LIST 에 대한 로딩 종료
}

// 외부 사용용 상품 Saga 함수
export function* itemSaga() {
    // 상세조회
    yield takeLatest(FETCH_ITEM, fetchItemSaga)

    // 목록 조회
    yield takeLatest(FETCH_ITEM_LIST, fetchItemListSaga)
}

// 모듈 초기 상태
const initialState = {
    item: null,
    items: [],
    error: null
}

// 리듀서 함수 정의
const item = handleActions(
    {
        // 상세 조회 상태 변경
        [FETCH_SUCCESS]: (state, action) => ({
            ...state,
            item: action.payload
        }),
        [FETCH_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload
        }),
        // 목록 조회 상태 변경
        [FETCH_LIST_SUCCESS]: (state, action) => ({
            ...state,
            items: action.payload
        }),
        [FETCH_LIST_FAILURE]: (state, action) => ({
            ...state,
            error: action.payload
        }),
    },
    initialState
)

export default item
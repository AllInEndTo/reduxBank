import {put, takeEvery} from 'redux-saga/effects'
import {ADD_ASYNC_CASH, addAsyncCashAction} from "../store/cashReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* incrementWorker() {
    yield delay(1000)
    yield put(addAsyncCashAction())
}

export function* countWatcher() {
    yield takeEvery(ADD_ASYNC_CASH, incrementWorker)
}
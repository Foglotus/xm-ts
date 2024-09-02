
export function resError<T = any>(message?:string, data?: T) {
    return {
        code: 500,
        message: message ?? '请求出错,请稍后重试',
        data,
    }
}

export function resErrorWithCode<T = any>(code:number, message?:string, data?: T) {
    return {
        code: code,
        message: message ?? '请求出错,请稍后重试',
        data,
    }
}

export function resSuccess<T=any>(message?: string, data?: T) {
    return {
        code: 0,
        message: message ?? '请求成功',
        data,
    }
}
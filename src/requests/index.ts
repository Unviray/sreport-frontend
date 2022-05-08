import useSWR from "swr"

import instance from "./instance"

export const useGet = (endpoint: string | null, option?: object) => {
  const { data, error } = useSWR([endpoint, option], async (url, option) => {
    const res = await instance.get(url as string, option)
    return res.data
  })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const usePost = (endpoint: string, body: object, option: object) => {
  const { data, error } = useSWR(
    [endpoint, body, option],
    async (url, body, option) => {
      const res = await instance.post(url, body, option)
      return res.data
    }
  )

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

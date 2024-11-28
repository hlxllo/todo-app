import httpInstance from "@/utils/http";

export function getDutiesAPI(date, page = 1, size = 20) {
  return httpInstance({
    url: '/duty',
    params: {
      date,
      page,
      size
    }
  })
}
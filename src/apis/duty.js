import httpInstance from "@/utils/http";

// 分页查询 duty
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

// 根据 id 删除 duty
export function delDutyByIdAPI(id) {
  return httpInstance({
    url: '/duty/' + id,
    method: 'DELETE'
  })
}

// 根据名称添加 duty
export function addDutyAPI(name, description, date) {
  return httpInstance({
    url: '/duty',
    method: 'POST',
    data: {
      name,
      description,
      date
    }
  })
}

// 修改 duty
export function updateDutyAPI(id, name, description) {
  return httpInstance({
    url: '/duty/' + id,
    method: 'PUT',
    data: {
      name,
      description
    }
  })
}
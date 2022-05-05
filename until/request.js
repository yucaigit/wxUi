import axios from "axios";
const baserUrl = "http://localhost:8080"
import qs from 'qs'


export function get(url,param) {
  return new Promise((resolve, reject) => {
    axios.get(baserUrl+url,{params:param}).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err.data)
    })
  })
};

export function post(url,param) {
  return new Promise((resolve, reject) => {
    axios.post(baserUrl+url,qs.stringify(param)).then(res=>{
      resolve(res.data)
    }).catch(err=>{
      reject(err.data)
    })
  })
};


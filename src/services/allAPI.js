import commonAPI from "./commonAPI"
import SERVERURL from "./serverURLL.js";

export const saveworkoutAPI = async (workoutDetails) => {
    return await commonAPI("POST", `${SERVERURL}/uploadWorkoutDetails`, workoutDetails);
 }

 export const getAllWorkoutAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/uploadWorkoutDetails`,"")
 }

 export const deleteWorkoutDetailsAPI = async(id)=>{
        return await commonAPI("DELETE",`${SERVERURL}/uploadWorkoutDetails/${id}`,{})
 }

 export const getEditWorkotDetailsAPI = async(id)=>{
    return await commonAPI("GET",`${SERVERURL}/uploadWorkoutDetails/${id}`,{})
 }

 export const updateWorkoutDetailsAPI = async(id,workoutDetails)=>{
    return await commonAPI("PUT",`${SERVERURL}/uploadWorkoutDetails/${id}`,workoutDetails)
 }
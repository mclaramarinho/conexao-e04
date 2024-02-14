export default interface IApiClasses {
        _id: String,
        name: String,
        days: Array<String>,
        start_time: Array<String>,
        end_time: Array<String>,
        classroom: String,
        teacher: String,
        exam_1_timestamp: String,
        exam_2_timestamp: String,
        re_take_exam_timestamp: String,
        final_exam_timestamp: String,
        observations: String,
        created_by: String,
        created_at_timestamp: String,
        last_edited_by: String,
        last_edited_at: String
}
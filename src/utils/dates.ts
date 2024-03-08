export function isoToDateTimeFormat(iso : string){
    try{
        const date = isoToDate(iso);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} - ${hour}:${minutes}`;
    }catch(err){
        console.log(err);
        throw (err);
    }
};

export function isoToTimeFormat(iso : string){
    try{
        const date = isoToDate(iso);
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minutes}`;
    }catch(err){
        console.log(err);
        throw (err);
    }
};

export function timeToIsoFormat(time : string){
    const regex = /[0-9]{1}[0-9]{1}:[0-9]{1}[0-9]{1}/gm;

    if(regex.test(time) === false) return 'invalid time';

    const arr = time.split(':');
    const h = parseInt(arr[0]);
    const m = parseInt(arr[1]);
    const isoDate = new Date();
    isoDate.setHours(h, m, 0, 0);
    return isoDate.toISOString()
};

export function isoToDate(iso : string){
    try{
        const date = new Date(iso);
        return date
    }catch(err){
        console.error(err);
        throw new Error('Invalid date');
    }
};

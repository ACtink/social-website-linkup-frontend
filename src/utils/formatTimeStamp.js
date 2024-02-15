
export const formatTimeStamp = (timestampString)=>{
    const timestamp = new Date(timestampString);
    
    
    const options = { 
      year: "numeric", 
      month: "short", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
    //   timeZoneName: "short"
    };
    
    const formattedDate = timestamp.toLocaleDateString("en-US", options);
    
    return formattedDate
    
    
    }
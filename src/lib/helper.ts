import moment from "moment";

export const formatDate = (date: Date) => {
  const postDate = moment(date);
  const currentDate = moment();
  const diffInSeconds = currentDate.diff(postDate, "seconds");
  const diffInMinutes = currentDate.diff(postDate, "minutes");
  const diffInHours = currentDate.diff(postDate, "hours");
  const diffInDays = currentDate.diff(postDate, "days");
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else {
    return postDate.format("MMM DD, YYYY");
  }
};

export const formatImageUrl = (url: string) => {
  return `${process.env.BASE_URL}${url}`;
};

export const formatText = (text: string) => {
  if (text?.length < 150) return text;
  return text?.substring(0, 150) + "...";
};

export const formatReadMin = (text: string) => {
  return `${Math.ceil(text?.length / 250)} min read`;
};

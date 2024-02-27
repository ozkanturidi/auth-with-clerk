import moment from "moment";

export const formatDate = (date: any) => {
  const postDate = moment(date);
  const currentDate = moment();

  if (currentDate.diff(postDate, "days") < 1) {
    return postDate.startOf("day").fromNow();
  } else {
    return postDate.format("MMM Do YY");
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

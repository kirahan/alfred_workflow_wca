const axios = require("axios");
const { WCA_ORIGIN } = require("./config");
const { refreshUserAccessToken } = require("./wca");

/* Returns functions sending requests to the WCA API.
Requests are authorized with the given user's OAuth data.
If OAuth access token is about to expire it refreshes it. */
module.exports = (user = null) => {
  const wcaApiFetch = async (path, fetchOptions = { method: "get" }) => {
    if (user) {
      refreshUserAccessToken(user);
    }
    const wcahttp = axios.create({
      baseURL: `${WCA_ORIGIN}/api/v0`,
      timeout: 100000,
      headers: {
        Authorization: user ? `Bearer ${user.oauth.accessToken}` : null,
        "Content-Type": "application/json"
      }
    });
    if (fetchOptions.method == "get") {
      const res = await wcahttp.get(`${path}`);
      return res.data;
    } else {
      const res = await wcahttp.post(`${path}`, fetchOptions.config);
      return res.data;
    }
  };

  const getMe = async () => {
    const { me } = await wcaApiFetch("/me", { method: "get" });
    return me;
  };

  const getRecords = () => {
    return wcaApiFetch("/records");
  };

  const getPeopleByWcaIds = wcaid => {
    return wcaApiFetch(`/persons?per_page=100&wca_ids=${wcaid}`);
  };

  const searchPeopleByNameOrWcaid = nameOrwcaid => {
    return wcaApiFetch(`/search/users?q=${nameOrwcaid}&persons_table=true`);
  };

  const searchCompetitionInfoByTitle = title =>{
    return wcaApiFetch(`/search/competitions?q=${title}`)
  }

  const getCompetitionInfoById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}`)
  }

  const getCompetitionResultById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}/results`)
  }

  const getCompetitionCompetitorsById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}/competitors`)
  }

  const getCompetitionRegistrationsById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}/registrations`)
  }

  const getCompetitionScheduleById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}/schedule`)
  }
  const getCompetitionWcifPublicById = competition_id =>{
    return wcaApiFetch(`/competitions/${competition_id}/wcif/public`)
  }

  const searchRuleByTitle = title =>{
    return wcaApiFetch(`/search/regulations?q=${title}`)
  }

  const getDelegates = ()=>{
    return wcaApiFetch(`/delegates`)
  }

  return {
    getMe,
    getRecords,
    getPeopleByWcaIds,
    getCompetitionInfoById,
    getCompetitionResultById,
    getCompetitionScheduleById,
    getCompetitionWcifPublicById,
    getCompetitionCompetitorsById,
    getCompetitionRegistrationsById,
    searchRuleByTitle,
    searchPeopleByNameOrWcaid,
    searchCompetitionInfoByTitle,
  };
};

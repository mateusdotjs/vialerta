import { supabase } from "./supabase";

export async function postOcorrencia(userId, type, idLinha) {
  const { error } = await supabase
    .from("ocorrencias")
    .insert({ user: userId, type: type, linha: idLinha });
  if (error) return error.message;
  else return null;
}

const defaultDate = new Date();
defaultDate.setMinutes(defaultDate.getMinutes() - 30);

export async function getTotalOcorrencias(id, type, time) {
  if (type === "Todas") type = null;
  let date = new Date();

  switch (time) {
    case "lastHalfHour":
      date = null;
      break;

    case "lastHour":
      date.setMinutes(date.getMinutes() - 60);
      break;

    case "lastMonth":
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      break;

    default:
      date = null;
      break;
  }

  let query = supabase
    .from("ocorrencias")
    .select("*", { count: "exact", head: true });

  query = id ? query.eq("linha", id) : query;
  query = type ? query.eq("type", type) : query;
  query = date
    ? query.gt("created_at", date.toISOString())
    : query.gt("created_at", defaultDate.toISOString());

  const { count, error } = await query;
  return { count, error };
}

export async function getRowOcorrencias(id, type, time) {
  if (type === "Todas") type = null;
  let date = new Date();

  switch (time) {
    case "lastHalfHour":
      date = null;
      break;

    case "lastHour":
      date.setMinutes(date.getMinutes() - 60);
      break;

    case "lastMonth":
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      break;

    default:
      date = null;
      break;
  }

  let query = supabase
    .from("ocorrencias")
    .select("*");

  query = id ? query.eq("linha", id) : query;
  query = type ? query.eq("type", type) : query;
  query = date
    ? query.gt("created_at", date.toISOString())
    : query.gt("created_at", defaultDate.toISOString());

  const { data, error } = await query;
  return { data, error };
}

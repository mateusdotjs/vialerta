import { supabase } from "./supabase";

export async function postOcorrencia(userId, type, idLinha) {
  const { error } = await supabase
    .from("ocorrencias")
    .insert({ user: userId, type: type, linha: idLinha });
  if (error) return error.message;
  else return null;
}

export async function getTotalOcorrencias(id, type, date) {
  if (type === "Todas") type = null;

  const defaultDate = new Date();
  defaultDate.setMinutes(defaultDate.getMinutes() - 30);

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

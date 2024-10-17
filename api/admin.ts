import { coreApi } from "./core";

export async function banUser(data: { accountId: string }, token: string) {
  return await coreApi.fetch({
    url: "/ban",
    method: "POST",
    data,
    token,
  });
}

export async function unbanUser(data: { accountId: string }, token: string) {
  return await coreApi.fetch({
    url: "/unban",
    method: "POST",
    data,
    token,
  });
}

export async function solveComplaint(complaintId: string, token: string) {
  return await coreApi.fetch({
    url: `/customer/complaint/${complaintId}/solve`,
    method: "POST",
    token: token,
    data: {},
  });
}

export async function getAccount(email: string, token: string) {
  return await coreApi.fetch({
    url: `/account/${email}`,
    method: "GET",
    token: token,
  });
}

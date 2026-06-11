type WelcomeEmailNotificationInput = {
  email: string;
  petName: string;
  companionId: string;
};

export function notifyWelcomeEmail(input: WelcomeEmailNotificationInput) {
  void fetch("/api/send-welcome-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then(async (response) => {
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; reason?: string }
        | null;

      console.log("[PetLuma] Welcome email send result:", {
        ok: response.ok,
        status: response.status,
        success: result?.success ?? false,
        reason: result?.reason,
      });
    })
    .catch((error) => {
      console.warn("[PetLuma] Welcome email notification failed:", error);
    });
}

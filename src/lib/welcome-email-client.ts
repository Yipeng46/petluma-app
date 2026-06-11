type WelcomeEmailNotificationInput = {
  toEmail: string;
  petName: string;
  companionId: string;
  passportNo: string;
  dateRegistered: string;
  country: string;
};

export function notifyWelcomeEmail(input: WelcomeEmailNotificationInput) {
  void fetch("/api/welcome-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  }).catch((error) => {
    console.warn("[PetLuma] Welcome email notification failed:", error);
  });
}

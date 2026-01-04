let loginAttempt = {}


export function loginRateLimiter(req, res, next) {
   const ip = req.ip;

if (!loginAttempt[ip]) {
   loginAttempt[ip] = {
      count: 1,
      firstAttempt: Date.now()
   };



}

const record = loginAttempt[ip];
const timePassed = Date.now() - record.firstAttempt;
const windowMs = 10 * 60 * 1000;

// window expired
if (timePassed > windowMs) {
   record.count = 1;
   record.firstAttempt = Date.now();
   return next();
}

// still inside window
if (record.count >= 5) {
   return next({
      status: 429,
      message: "too many login attempts — try again later"
   });
}

record.count++;
return next();

}

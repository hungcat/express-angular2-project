import { Router, Request, Response } from "express";
const router: Router = Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next) {
  res.send('respond with a resource');
});

export = router;

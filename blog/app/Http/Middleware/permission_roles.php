<?php

namespace App\Http\Middleware;

use Closure;
use App\Providers\RouteServiceProvider;

use Illuminate\Support\Facades\Auth;
class permission_roles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (auth()->user()->hasPermissionTo('عرض صلاحية'))
        {

             return redirect(RouteServiceProvider::ROLE_USER);
        }
        return $next($request);
    }
}

<x-blank-layout class="login-page">
    <div class="login-box">
        <div class="login-logo">
            <a href="/" class="d-block w-100 h-100">
                <x-application-logo class="w-25" />
            </a>
        </div>
        <div class="card">
            <div class="card-body">
                <!-- Session Status -->
                <x-auth-session-status class="mb-4" :status="session('status')" />

                <!-- Validation Errors -->
                <x-auth-validation-errors class="mb-4" :errors="$errors" />

                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <!-- Email Address -->
                    <div class="form-floating mb-3">
                        <x-input 
                            id="email" 
                            class="form-control" 
                            type="email" 
                            name="email" 
                            :value="old('email')" 
                            placeholder="Type email..."
                            required 
                            autofocus />

                        <x-label for="email" :value="__('Email')" />
                    </div>

                    <!-- Password -->
                    <div class="form-floating">
                        <x-input 
                            id="password" 
                            class="form-control"
                            type="password"
                            name="password"
                            placeholder="Type password..."
                            autocomplete="current-password" 
                            required />
                                        
                        <x-label for="password" :value="__('Password')" />
                    </div>

                    <div class="d-flex justify-content-between">
                        <!-- Remember Me -->
                        <div class="form-check mt-4">
                            <input 
                                id="remember_me" 
                                type="checkbox" 
                                class="form-check-input" 
                                name="remember">

                            <label for="remember_me" class="form-check-label">
                                {{ __('Remember me') }}
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3 float-right">
                            Submit
                        </button>
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        @if (Route::has('password.request'))
                            <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                                {{ __('Forgot your password?') }}
                            </a>
                        @endif                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-blank-layout>

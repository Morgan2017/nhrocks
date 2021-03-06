@props(['errors'])

@if ($errors->any())
    <div {{ $attributes }}>
        <div class="text-danger">
            {{ __('Something went wrong:') }}
        </div>

        @foreach ($errors->all() as $error)
            <p class="text-danger">
                <span class="fs-3">
                    &#8250;
                </span>
                {{ $error }}
            </p>
        @endforeach
    </div>
@endif

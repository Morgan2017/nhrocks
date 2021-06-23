@extends('errors.illustrated-layout')

@section('title')
    The {{ $exception->getStatusCode() }} error is appeared with next message: 
    {{ $exception->getMessage() }}
@endsection

@section('message')

<h2>{{ $exception->getMessage() }}</h2>

@endsection